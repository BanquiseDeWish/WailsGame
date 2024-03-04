import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
import BaseModal from '@/Components/Modal/BaseModal';
import InputDropdown from '@/Components/Forms/InputDropdown';
import InputComboBox from '@/Components/Forms/InputComboBox';

import pokemonList from '@assets/data/pokemons';

import EggImg from '@assets/img/tools/shinywars/egg.png';

import '@css/modal.css';

export default class AddPokemonModal extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            formData: [],
            pokemon: undefined,
            pokemonForm: undefined,
            lastPokemon: pokemonList[1],
            spriteLink: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/1/shiny.png`
        };
        this.state.openModal = false;
    }

    getButton() {
        return (<div className='rounded-lg container_background p-4 h-[56px] text-[#57779D] font-semibold cursor-pointer'>💭 Choisir un Shiny</div>);
    }

    onPokemonChange(value) {
        if(typeof value === 'string') {
            let v = pokemonList.find(pokemon => pokemon.name.toLowerCase() === value.toLowerCase());
            if(v != null)
                value = v;
        }
        this.setState({ pokemon: value });
        if(typeof value === 'string') return;
        this.setState({ lastPokemon: value });
        axios.get(`https://tyradex.tech/api/v1/pokemon/${value.id}`)
            .then(response => {
                let forms = [{ id: 'shiny', label: response.data.name.fr }];
                if (response.data.formes && response.data.formes.length > 0) {
                    response.data.formes.forEach(form => {
                        forms.push({ id: "shiny_" + form.region, label: form.name.fr });
                    });
                }
                this.setState({ formData: forms });
                this.setState({ pokemonForm: forms[0] });
            })
    }

    render() {
        return super.render(
            <>
                <div className='flex flex-col gap-[32px] items-center justify-center w-[800px] px-[32px]'>
                    <span className='text-[24px] font-semibold'>Ajouter un Pokémon</span>
                    <div className='flex flex-row justify-between gap-[80px] items-center w-full'>

                        <div className='flex flex-col gap-[24px] w-full justify-center items-center'>
                            <InputComboBox
                                label='Shiny Capturé'
                                dataKey='id'
                                textField='name'
                                data={pokemonList}
                                value={this.state.pokemon}
                                hideCaret
                                onChange={value => this.onPokemonChange(value)}
                                onSelect={value => this.onPokemonChange(value)}
                                globalClassName='w-full z-50'
                                placeholder='Nom du Pokémon'
                            />
                            <InputDropdown
                                label='Forme'
                                dataKey='id'
                                textField='label'
                                data={this.state.formData}
                                value={this.state.pokemonForm}
                                onChange={(value) => this.setState({ pokemonForm: value })}
                                globalClassName='w-full z-40'
                                autoComplete='off'
                            />
                            <GreenButton 
                                className='button_green outline-none w-fit'
                                onClick={() => {
                                    setTimeout(() => {
                                        this.closeModal();
                                    }, 300);
                                }}
                            >
                                Ajouter
                            </GreenButton>
                        </div>
                        <img 
                            width={256}
                            src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${this.state.lastPokemon?.id}/${this.state.pokemonForm?.id}.png`}
                            alt=""
                            onError={(e) => { e.target.onerror = null; e.target.src = EggImg }}
                        />
                    </div>
                </div>
                <style>{`
                    #modal input {
                        background: none !important;
                    }
                    :root {
                        --rw_popup_background: #233E67;
                        --rw-list-option-color: #fff;
                        --rw-list-option-hover: #395786;
                    }
                `}</style>
            </>
        )
    }
}