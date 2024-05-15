import React from "react";
import axios from "axios";
import { toast } from "sonner";
import UserCard from "./UserCard";

export default class UserCardBatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users_ids: this.props.users_ids ?? [],
            users_cosmetics: this.props.users_cosmetics ?? [],
        }
    }

    getUserCosmetics() {

        let ids = [];
        this.state.users_ids.forEach((id) => {
            if(this.state.users_cosmetics[id] == undefined) {
                ids.push(id);
            }
        });

        axios.get(route('users.cosmetics.active', {twitch_ids: ids.length != 0 ? ids : [0]})).then((res) => {
            if(res.data == null || res.data == undefined) return;
            if(res.data.error) return;
            this.setState((prevState) => ({...prevState, users_cosmetics: res.data}));
        }).catch((err) => {
            toast.error('Une erreur est survenue lors de la récupération des cosmétiques.');
            console.log(err);
        });
    }


    componentDidMount() {
        this.getUserCosmetics();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.users_ids !== prevState.users_ids) {
            this.getUserCosmetics();
        }
    }

    getItem(cosmetics) {
        return (
            <UserCard propsCosmetics={cosmetics}/>
        )
    }

    render(children) {
    
        return(
            <div className={this.state.className}>
                {children}

                {this.state.users_ids.map((id) => {
                    let cosmetics = this.state.users_cosmetics[id];
                    return this.getItem(cosmetics);
                })}
            </div>
        );
    }
}