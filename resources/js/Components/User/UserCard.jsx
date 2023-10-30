import { usePage } from '@inertiajs/react';

import '../../../css/vipgames.css';

export default function UserCard({userId=0, userName="Unkown Username", ...otherProps}) {

    const props = usePage().props;
    const avatar = props.ziggy.url + '/api/user/' + userId + '/icon';

    return (
        <div className='container w-[300px] h-fit p-[16px] flex-shrink-0 gap-[8px] bg-[#121A25]' {...otherProps}>
            <img src={avatar} alt="" className='rounded-full h-[40px] w-[40px] bg-[#121A25]' width={40}/>
            <div className='flex flex-col gap-[0px] w-full overflow-hidden'>
                <div className='item_username'>{userName}</div>
                <div className='item_subtext'>Un Pingouin Content de Jouer</div>
            </div>
        </div>
    );

}