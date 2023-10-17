import { Head, usePage} from '@inertiajs/react';
import React, { useState, useEffect  } from 'react';
import { socket } from '../../../../js/socket';

import GlobalLayout from '@/Layouts/GlobalLayout';

export default function VipGame() {
    const props = usePage().props;

    console.log(props);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
      }, []);

    return (
        <GlobalLayout>
            <Head title="VIP Game" />
        </GlobalLayout>
    );
}
