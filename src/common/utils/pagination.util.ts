export interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export interface PaginationResult<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export class PaginationUtil {
  static createPaginationResult<T>(
    results: T[],
    count: number,
    page: number,
    pageSize: number,
    baseUrl: string,
    queryParams?: Record<string, any>,
  ): PaginationResult<T> {
    const totalPages = Math.ceil(count / pageSize);
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    const buildUrl = (pageNum: number | null): string | null => {
      if (pageNum === null) return null;
      const params = new URLSearchParams({
        page: pageNum.toString(),
        pageSize: pageSize.toString(),
        ...(queryParams || {}),
      });
      return `${baseUrl}?${params.toString()}`;
    };

    return {
      count,
      next: buildUrl(nextPage),
      previous: buildUrl(previousPage),
      results,
    };
  }

  static getSkip(page: number, pageSize: number): number {
    return (page - 1) * pageSize;
  }

  static normalizePage(page?: number): number {
    return page && page > 0 ? page : 1;
  }

  static normalizePageSize(pageSize?: number): number {
    if (!pageSize || pageSize < 1) return 20;
    if (pageSize > 100) return 100;
    return pageSize;
  }
}
