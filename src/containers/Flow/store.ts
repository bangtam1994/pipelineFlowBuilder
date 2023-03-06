import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';
import { Service } from '../types';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  services: Service[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  addFirstNode: (node: Node) => void;
  updateNodeData: (data: Service) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  services: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          animated: true,
          deletable: true,
          style: { stroke: 'red' },
          markerEnd: {
            type: MarkerType.Arrow,
            width: 30,
            height: 30,
            color: 'red',
          },
        },
        get().edges
      ),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addFirstNode(node: Node) {
    set({ nodes: [node] });
  },
  addNode(node: Node) {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNodeData: ({ id, type, ...data }: Service) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, ...data };
        }

        return node;
      }),
    });

    const foundService = get().services.find((el: Service) => el.id === id);

    if (foundService)
      set({
        services: get().services.map((service: Service) =>
          service.id === id ? { ...service, ...data } : service
        ),
      });
    else
      set({
        services: [...get().services, { id, type, ...data }],
      });
  },
}));

export default useStore;
