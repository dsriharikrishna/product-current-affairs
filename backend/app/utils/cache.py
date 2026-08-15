import functools
from cachetools import TTLCache, keys

def get_cache(maxsize=100, ttl=300):
    return TTLCache(maxsize=maxsize, ttl=ttl)

def async_ttl_cache(maxsize=100, ttl=300):
    """
    Decorator to cache async functions using a TTLCache.
    """
    cache = TTLCache(maxsize=maxsize, ttl=ttl)

    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            # Exclude 'self' or 'cls' from the hashkey if this is a method
            # For simplicity, we just hash the args and kwargs.
            # If the first arg is an instance (e.g. self) and doesn't implement __hash__ properly, 
            # we might need to skip it. We'll skip the first arg if it's named 'self' or typically 'self' 
            # in a class context. Since we don't know parameter names, we just hash args[1:] if args[0] is an object.
            # Alternatively, since we know we're using this on a service singleton, we can just hash kwargs and args[1:]
            
            # Simple approach: skip the first argument if it's the class instance (self)
            hash_args = args[1:] if args and hasattr(args[0], '__dict__') else args
            key = keys.hashkey(*hash_args, **kwargs)
            if key in cache:
                return cache[key]
            result = await func(*args, **kwargs)
            cache[key] = result
            return result
        return wrapper
    return decorator
