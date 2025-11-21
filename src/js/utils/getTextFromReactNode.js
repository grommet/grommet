import React from 'react';

export const getTextFromReactNode = (node) => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node || typeof node === 'boolean') return '';

  if (React.isValidElement(node)) {
    if (typeof node.props.children === 'string') {
      return node.props.children;
    }
    if (Array.isArray(node.props.children)) {
      return node.props.children
        .map(getTextFromReactNode)
        .filter(Boolean)
        .join(' ');
    }
    if (node.props.children) {
      return getTextFromReactNode(node.props.children);
    }
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromReactNode).filter(Boolean).join(' ');
  }

  return '';
};
