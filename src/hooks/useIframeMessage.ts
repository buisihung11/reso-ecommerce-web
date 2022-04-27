import { useContext } from 'react';
import { IframeMessageContext } from '@/contexts/IframeMessageContext';

// ----------------------------------------------------------------------

const useIframeMessage = () => useContext(IframeMessageContext);

export default useIframeMessage;
