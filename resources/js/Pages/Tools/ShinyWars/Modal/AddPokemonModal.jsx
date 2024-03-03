import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
import BaseModal from '@/Components/Modal/BaseModal';
import InputDropdown from '@/Components/Forms/InputDropdown';
import InputComboBox from '@/Components/Forms/InputComboBox';

import pokemonList from '@assets/data/pokemons';

import '@css/modal.css';

export default class AddPokemonModal extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            formData: [{ id: 1, label: 'Bulbizarre' }],
            pokemon: undefined,
            pokemonForm: { id: 'shiny', label: 'Bulbizarre'},
            lastPokemon: pokemonList[1]
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
                                defaultValue={'regular'}
                                onChange={(value) => this.setState({ pokemonForm: value })}
                                globalClassName='w-full z-40'
                                autoComplete='off'
                                selectIcon={<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.7 15H22.4895H31.3049C32.8134 15 33.5676 17.125 32.4991 18.3706L24.3594 27.8597C23.0552 29.3801 20.9339 29.3801 19.6297 27.8597L16.5341 24.2509L11.4901 18.3706C10.4373 17.125 11.1915 15 12.7 15Z" fill="#57779D"/>
                                </svg>
                                }
                            />
                            <GreenButton className='button_green outline-none w-fit'>Ajouter</GreenButton>
                        </div>
                        <img width={256} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${this.state.lastPokemon.id}/${this.state.pokemonForm.id}.png`} alt="" />
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