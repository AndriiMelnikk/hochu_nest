export interface SortOptions {
  sort?: string;
}

export interface SortField {
  field: string;
  order: 'asc' | 'desc';
}

export class SortUtil {
  static parseSort(sort?: string): SortField | null {
    if (!sort) return null;

    const isDesc = sort.startsWith('-');
    const field = isDesc ? sort.substring(1) : sort;
    const order = isDesc ? 'desc' : 'asc';

    return { field, order };
  }

  static buildSortObject(sort?: string): Record<string, 1 | -1> | null {
    const sortField = this.parseSort(sort);
    if (!sortField) return null;

    return {
      [sortField.field]: sortField.order === 'asc' ? 1 : -1,
    };
  }
}
