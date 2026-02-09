/**
 * Mock for lucide-react icons used across all React components.
 * Each icon renders as a simple span with a data-testid for querying.
 */

const React = require('react');

function createMockIcon(name) {
  const MockIcon = (props) =>
    React.createElement('span', { 'data-testid': `icon-${name}`, ...props });
  MockIcon.displayName = name;
  return MockIcon;
}

module.exports = {
  BookOpen: createMockIcon('BookOpen'),
  Globe: createMockIcon('Globe'),
  Languages: createMockIcon('Languages'),
  ShieldCheck: createMockIcon('ShieldCheck'),
  HandHeart: createMockIcon('HandHeart'),
  Zap: createMockIcon('Zap'),
  ChevronRight: createMockIcon('ChevronRight'),
  Info: createMockIcon('Info'),
  Sparkles: createMockIcon('Sparkles'),
  ArrowRight: createMockIcon('ArrowRight'),
  Search: createMockIcon('Search'),
  ShieldAlert: createMockIcon('ShieldAlert'),
  MessageSquare: createMockIcon('MessageSquare'),
  Users: createMockIcon('Users'),
  TrendingUp: createMockIcon('TrendingUp'),
  Scale: createMockIcon('Scale'),
  Activity: createMockIcon('Activity'),
  History: createMockIcon('History'),
  Play: createMockIcon('Play'),
  RotateCcw: createMockIcon('RotateCcw'),
  CheckCircle2: createMockIcon('CheckCircle2'),
  Radio: createMockIcon('Radio'),
  Send: createMockIcon('Send'),
  ArrowLeft: createMockIcon('ArrowLeft'),
  Waves: createMockIcon('Waves'),
};
