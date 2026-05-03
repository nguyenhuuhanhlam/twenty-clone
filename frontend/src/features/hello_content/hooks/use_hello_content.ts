import { useState, useEffect } from 'react';
import { getHelloMessages } from '../services/hello_content_service';
import type { HelloContent } from '../types';

type HelloContentState = {
  items: HelloContent[];
  loading: boolean;
  error: string | null;
};

export function useHelloContent(): HelloContentState {
  const [state, setState] = useState<HelloContentState>({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const items = getHelloMessages();
    setState({
      items,
      loading: false,
      error: null,
    });
  }, []);

  return state;
}
