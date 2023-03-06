import React from 'react';
import { Handle, Position, Node } from 'reactflow';
import { nodeHasHandle, nodeConstraints } from './utils';
import { useStoreApi } from 'reactflow';

interface CustomHandlesProps {
  children: React.ReactNode;
  type: any;
}

export const CustomHandles = ({ children, type }: CustomHandlesProps) => {
  const store = useStoreApi();

  return (
    <div>
      {nodeHasHandle[type as any].inputs ? (
        <Handle
          type="target"
          position={Position.Left}
          isValidConnection={(connection) =>
            (nodeConstraints as any)[
              (store as any)
                .getState()
                .getNodes()
                .find((node: Node) => node.id === connection.source).type
            ]['outputs'] === (nodeConstraints as any)[type]['inputs']
          }
        />
      ) : (
        <div></div>
      )}
      <div>{children}</div>
      {nodeHasHandle[type].outputs ? (
        <Handle
          type="source"
          position={Position.Right}
          isValidConnection={(connection) =>
            (nodeConstraints as any)[
              (store as any)
                .getState()
                .getNodes()
                .find((node: Node) => node.id === connection.target).type
            ]['inputs'] === (nodeConstraints as any)[type]['outputs']
          }
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CustomHandles;
