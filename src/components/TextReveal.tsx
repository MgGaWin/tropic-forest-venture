'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { EASE } from '@/lib/constants';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

const lineVariants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  // Split text into lines (by <br/> or by string lines)
  const lines: ReactNode[] = [];
  let currentLine: ReactNode[] = [];

  const processChildren = (node: ReactNode) => {
    if (typeof node === 'string') {
      const parts = node.split('\n');
      parts.forEach((part, i) => {
        if (i > 0) {
          lines.push(<br key={`br-${lines.length}`} />);
        }
        if (part) {
          currentLine.push(part);
        }
      });
    } else if (Array.isArray(node)) {
      node.forEach(processChildren);
    } else if (node && typeof node === 'object' && 'type' in node) {
      const element = node as React.ReactElement;
      if (element.type === 'br') {
        if (currentLine.length > 0) {
          lines.push([...currentLine]);
          currentLine = [];
        }
        lines.push(<br key={`br-${lines.length}`} />);
      } else {
        currentLine.push(node);
      }
    } else {
      currentLine.push(node);
    }
  };

  processChildren(children);
  if (currentLine.length > 0) {
    lines.push([...currentLine]);
  }

  return (
    <Tag className={className}>
      <motion.span
        ref={ref}
        className="block"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ transitionDelay: `${delay}s` }}
      >
        {lines.map((line, i) => {
          if (line && typeof line === 'object' && 'type' in line && (line as React.ReactElement).type === 'br') {
            return line;
          }
          return (
            <span key={i} className="block overflow-hidden">
              <motion.span className="block" variants={lineVariants}>
                {line}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
