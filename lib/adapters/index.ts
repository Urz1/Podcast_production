/**
 * Content Adapter Export
 * Currently uses mock adapter, can be swapped for CMS/API adapters
 */

export * from './types';
export * from './mock-adapter';

// Re-export the mock adapter as the default content adapter
// This can be changed to a CMS adapter when ready
import { mockContentAdapter } from './mock-adapter';

export const contentAdapter = mockContentAdapter;

export function getContentAdapter() {
	return contentAdapter;
}
