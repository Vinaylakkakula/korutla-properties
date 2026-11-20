/**
 * Supabase Client Configuration
 *
 * This client supports both live Supabase backend connection and seamless local fallback
 * so the application is completely "Client Ready" immediately, even before the client
 * creates their live Supabase project!
 */

const SUPABASE_URL = (
  import.meta.env.VITE_SUPABASE_URL || 'https://ccngngzkqtywlarzfqvo.supabase.co'
).trim();
const SUPABASE_ANON_KEY = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbmduZ3prcXR5d2xhcnpmcXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxOTg4NTYsImV4cCI6MjExMDc3NDg1Nn0.dULsFW_iPVN8uwYmFgoWC5kOyNuPGAtghkBC05agLpI'
).trim();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    !SUPABASE_URL.includes('your-project-id') &&
    !SUPABASE_ANON_KEY.includes('your-anon-public-key')
  );
};

export interface SupabaseResponse<T = any> {
  data: T | null;
  error: Error | null;
}

// Light REST Query Builder implementing PostgREST query standard
class QueryBuilder {
  private table: string;
  private selectCols: string = '*';
  private filters: Array<{ col: string; op: string; val: string }> = [];
  private orderCol?: string;
  private orderAsc: boolean = true;
  private limitCount?: number;
  private isSingle: boolean = false;

  constructor(table: string) {
    this.table = table;
  }

  select(columns: string = '*') {
    this.selectCols = columns;
    return this;
  }

  eq(col: string, val: any) {
    this.filters.push({ col, op: 'eq', val: String(val) });
    return this;
  }

  order(col: string, options?: { ascending?: boolean }) {
    this.orderCol = col;
    this.orderAsc = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.isSingle = true;
    this.limitCount = 1;
    return this;
  }

  private buildUrl(): string {
    const params = new URLSearchParams();
    if (this.selectCols) params.set('select', this.selectCols);
    for (const f of this.filters) {
      params.set(f.col, `${f.op}.${f.val}`);
    }
    if (this.orderCol) {
      params.set('order', `${this.orderCol}.${this.orderAsc ? 'asc' : 'desc'}`);
    }
    if (this.limitCount) {
      params.set('limit', String(this.limitCount));
    }
    return `${SUPABASE_URL}/rest/v1/${this.table}?${params.toString()}`;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };
    const sessionToken = localStorage.getItem('supabase_access_token');
    if (sessionToken) {
      headers.Authorization = `Bearer ${sessionToken}`;
    }
    if (this.isSingle) {
      headers['Accept'] = 'application/vnd.pgrst.object+json';
    }
    return headers;
  }

  async then(resolve: (value: SupabaseResponse) => void, reject?: (reason: any) => void) {
    if (!isSupabaseConfigured()) {
      resolve({ data: null, error: new Error('Supabase is not configured') });
      return;
    }

    try {
      const res = await fetch(this.buildUrl(), {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        resolve({ data: null, error: new Error(err.message || 'Fetch error') });
        return;
      }
      const data = await res.json();
      resolve({ data, error: null });
    } catch (err: any) {
      resolve({ data: null, error: err });
    }
  }

  async insert(values: any | any[]): Promise<SupabaseResponse> {
    if (!isSupabaseConfigured()) {
      return { data: values, error: null };
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${this.table}`, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          Prefer: 'return=representation',
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        return { data: null, error: new Error(err.message || 'Insert error') };
      }
      const data = await res.json();
      return { data: Array.isArray(data) && this.isSingle ? data[0] : data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  async update(values: any): Promise<SupabaseResponse> {
    if (!isSupabaseConfigured()) {
      return { data: values, error: null };
    }
    try {
      const res = await fetch(this.buildUrl(), {
        method: 'PATCH',
        headers: {
          ...this.getHeaders(),
          Prefer: 'return=representation',
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        return { data: null, error: new Error(err.message || 'Update error') };
      }
      const data = await res.json();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  async delete(): Promise<SupabaseResponse> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: null };
    }
    try {
      const res = await fetch(this.buildUrl(), {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        return { data: null, error: new Error(err.message || 'Delete error') };
      }
      return { data: true, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
}

// Supabase Auth Implementation
const auth = {
  async signUp({ email, password, options }: { email: string; password?: string; options?: any }) {
    if (!isSupabaseConfigured()) {
      return {
        data: {
          user: {
            id: `usr_${Date.now()}`,
            email,
            user_metadata: options?.data || {},
          },
          session: null,
        },
        error: null,
      };
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: password || 'Default1234!',
          data: options?.data,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: new Error(data.msg || data.message || 'Signup failed') };
      }
      if (data.access_token) {
        localStorage.setItem('supabase_access_token', data.access_token);
      }
      return { data, error: null };
    } catch (e: any) {
      return { data: null, error: e };
    }
  },

  async signInWithPassword({ email, password }: { email: string; password?: string }) {
    if (!isSupabaseConfigured()) {
      return {
        data: {
          user: { id: `usr_${Date.now()}`, email },
          session: { access_token: 'mock-token' },
        },
        error: null,
      };
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: new Error(data.error_description || data.msg || 'Login failed') };
      }
      if (data.access_token) {
        localStorage.setItem('supabase_access_token', data.access_token);
      }
      return { data: { user: data.user, session: data }, error: null };
    } catch (e: any) {
      return { data: null, error: e };
    }
  },

  async signOut() {
    localStorage.removeItem('supabase_access_token');
    if (!isSupabaseConfigured()) {
      return { error: null };
    }
    try {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${localStorage.getItem('supabase_access_token') || SUPABASE_ANON_KEY}`,
        },
      });
    } catch {
      // Ignore network errors on logout
    }
    return { error: null };
  },

  async getUser() {
    const token = localStorage.getItem('supabase_access_token');
    if (!token || !isSupabaseConfigured()) {
      return { data: { user: null }, error: null };
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return { data: { user: null }, error: null };
      const user = await res.json();
      return { data: { user }, error: null };
    } catch {
      return { data: { user: null }, error: null };
    }
  },

  onAuthStateChange(_callback: (event: string, session: any) => void) {
    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  },
};

// Storage Implementation
const storage = {
  from(bucket: string) {
    return {
      getPublicUrl(path: string) {
        return {
          data: {
            publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`,
          },
        };
      },
      async upload(path: string, file: File | Blob) {
        if (!isSupabaseConfigured()) {
          return { data: { path }, error: null };
        }
        try {
          const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${localStorage.getItem('supabase_access_token') || SUPABASE_ANON_KEY}`,
              'Content-Type': file.type || 'application/octet-stream',
            },
            body: file,
          });
          const data = await res.json();
          if (!res.ok) return { data: null, error: new Error(data.message || 'Upload failed') };
          return { data, error: null };
        } catch (e: any) {
          return { data: null, error: e };
        }
      },
    };
  },
};

// Export Unified Supabase Client
export const supabase = {
  from: (table: string) => new QueryBuilder(table),
  auth,
  storage,
};

export default supabase;
