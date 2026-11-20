import { AgentInfo, Property, Review } from '../types/property';
import { agents } from '../data/agents';
import { properties } from '../data/properties';
import { reviews } from '../data/reviews';

export const agentService = {
  getAllAgents: (): AgentInfo[] => {
    return [...agents];
  },

  getAgentById: (id: string): AgentInfo | undefined => {
    return agents.find((a) => a.id === id);
  },

  getAgentProperties: (agentId: string): Property[] => {
    return properties.filter((p) => p.agent.id === agentId);
  },

  getAgentReviews: (agentId: string): Review[] => {
    // Return reviews matching the agent or sample relevant reviews
    return reviews.slice(0, 3);
  },
};

