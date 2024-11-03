import * as crypto from 'crypto';

export function getUniqueItemsById(items: any[]): any[] {
    const uniqueIds = new Set<number>();
    return items.filter(item => {
        if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            return true;
        }
        return false;
    });
}

export function hashString(input: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}