export interface DomainRedisKey<Domain extends string, Service extends string, KeyType> {
  domain: Domain;
  service: Service;
  key: KeyType;
}

export function redisKeyFactory<D extends string, S extends string, K>
(domain: D, service: S, key: K): DomainRedisKey<D, S, K> {
  return {domain, service, key};
}