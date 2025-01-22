import logging
from typing import List, Tuple, Callable, Any


logging.basicConfig(
    format="%(levelname)s - %(message)s - Line:%(lineno)d", level=logging.INFO
)
logger = logging.getLogger(__name__)
logger.propagate = True


def log_function_params(skip: List[str] = None):
    if skip is None:
        skip = []

    def decorator(func: Callable) -> Callable:
        def wrapper(*args, **kwargs) -> Any:
            params = []
            # Log positional arguments
            for i, arg in enumerate(args):
                if func.__code__.co_varnames[i] not in skip:
                    params.append(f"{arg}")
            # Log keyword arguments
            for k, v in kwargs.items():
                if k not in skip:
                    params.append(f"{k}={v}")
            logger.info(f"{func.__name__} called with params: {', '.join(params)}")
            return func(*args, **kwargs)

        return wrapper

    return decorator
