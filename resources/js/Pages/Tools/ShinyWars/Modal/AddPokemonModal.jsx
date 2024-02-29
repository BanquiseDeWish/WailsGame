import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
import BaseModal from '@/Components/Modal/BaseModal';

import '@css/modal.css';

export default class AddPokemonModal extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,

        };
        this.state.openModal = false;
    }

    getButton() {
        return (<div className='rounded-lg container_background p-4 h-[56px] text-[#57779D] font-semibold cursor-pointer'>💭 Choisir un Shiny</div>);
    }

    render() {
        return super.render(
            <>
            </>
        )
    }
}