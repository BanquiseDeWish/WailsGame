import { Head, usePage} from '@inertiajs/react';

import GlobalLayout from '@/Layouts/GlobalLayout';

export default function VipGames() {

    const props = usePage().props;
    
    return (
        <GlobalLayout>
            <Head title="VipGames" />
        </GlobalLayout>
    );
}
