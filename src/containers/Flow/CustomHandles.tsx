import React from 'react';
import { Handle, Position, Node } from 'reactflow';
import { nodeHasHandle, nodeConstraints } from './utils';
import { useStoreApi } from 'reactflow';
import { ServiceType } from '../types';

interface CustomHandlesProps {
  children: React.ReactNode;
  type: any;
}

export const CustomHandles = ({ children, type }: CustomHandlesProps) => {
  const store = useStoreApi();
  return (
    <div>
      {nodeHasHandle[type as ServiceType].inputs ? (
        <Handle
          type="target"
          position={Position.Left}
          isValidConnection={(connection) => {
            const nodeInputs = (nodeConstraints as any)[type]['inputs'];
            const foundMatchingValue = nodeInputs.filter((el: string) =>
              (nodeConstraints as any)[
                (store as any)
                  .getState()
                  .getNodes()
                  .find((node: Node) => node.id === connection.source).type
              ]['outputs'].includes(el)
            );

            return foundMatchingValue.length > 0;
          }}
        />
      ) : (
        <div></div>
      )}
      <div>{children}</div>
      {nodeHasHandle[type].outputs ? (
        <Handle
          type="source"
          position={Position.Right}
          isValidConnection={(connection) => {
            const nodeOutputs = (nodeConstraints as any)[type]['outputs'];

            const foundMatchingValue = nodeOutputs.filter((el: string) =>
              (nodeConstraints as any)[
                (store as any)
                  .getState()
                  .getNodes()
                  .find((node: Node) => node.id === connection.target).type
              ]['inputs'].includes(el)
            );

            return foundMatchingValue.length > 0;
          }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CustomHandles;
