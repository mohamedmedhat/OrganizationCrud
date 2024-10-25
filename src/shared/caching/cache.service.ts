import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly _cache: Cache) {}

  async get(key: string): Promise<string> {
    return await this._cache.get<string>(key);
  }

  async set(key: string, data: any, ttl: number): Promise<void> {
    await this._cache.set(key, data, ttl);
  }

  async del(key: string): Promise<void> {
    await this._cache.del(key);
  }

  async reset(): Promise<void> {
    await this._cache.reset();
  }

  async reviver(key: string, value: any): Promise<any> {
    if (
      typeof value === 'string' &&
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)
    ) {
      return new Date(value);
    }
    return value;
  }

  async handleCachingPaginatedQuery<T>(
    cacheKey: string,
    queryFunction: () => Promise<[T[], number]>,
  ): Promise<[T[], number]> {
    try {
      const cacheData = await this.get(cacheKey);
      if (cacheData) {
        return JSON.parse(cacheData, this.reviver);
      }
      const result = await queryFunction();
      await this.set(cacheKey, JSON.stringify(result), 3600);
      return result;
    } catch (error) {
      throw new BadRequestException('Failed To Cache Query');
    }
  }

  async handleCachingQueryItem<T>(
    cacheKey: string,
    query: () => Promise<T>,
  ): Promise<T> {
    try {
      const cacheData = await this.get(cacheKey);
      if (cacheData) {
        return JSON.parse(cacheData, this.reviver);
      }
      const result = await query();
      await this.set(cacheKey, JSON.stringify(result), 3600);
      return result;
    } catch (error) {
      throw new BadRequestException('Failed To Cache Query');
    }
  }
}
