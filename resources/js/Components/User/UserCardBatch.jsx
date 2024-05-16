import React from "react";
import axios from "axios";
import { toast } from "sonner";
import UserCard from "./UserCard";

export default class UserCardBatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cosmetics_data: {cosmetics: [], users: {}}
        }
    }

    /*getUserCosmetics() {
        let ids = [];
        this.props.users_ids?.forEach((id) => {
            if(this.state?.cosmetics_data == undefined || this.state?.cosmetics_data.users[id] == undefined) {
                ids.push(id);
            }
        });
        axios.get(route('users.cosmetics.active', {twitch_ids: ids.length != 0 ? ids : [0]})).then((res) => {
            if(res.data == null || res.data == undefined) return;
            if(res.data.error) return;
            let cosmetics_data = this.state.cosmetics_data;
            res.data.cosmetics.forEach((cosmetic) => {
                if(!cosmetics_data.cosmetics.includes(cosmetic)) {
                    cosmetics_data.cosmetics.push(cosmetic);
                }
            });
            Object.entries(res.data.users).forEach((entry) => {
                cosmetics_data.users[entry[0]] = entry[1];
            });
            this.setState((prevState) => ({...prevState, cosmetics_data: cosmetics_data}));
        }).catch((err) => {
            toast.error('Une erreur est survenue lors de la récupération des cosmétiques.');
            console.log(err);
        });
    }


    componentDidMount() {
        this.getUserCosmetics();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.users_ids?.toString() != prevProps.users_ids?.toString()) {
            this.getUserCosmetics();
        }
    }*/

    getItem(index, cosmetics) {
        return (
            <UserCard propsCosmetics={cosmetics}/>
        )
    }

    render(children) {

        return(
            <div className={this.props.className ?? ''}>
                {children}

                {this.props?.users_ids?.map((id, index) => {
                    let cosmetics = this.state?.cosmetics_data?.cosmetics?.filter((cosmetic) => {
                        return this.state?.cosmetics_data?.users[id]?.includes(cosmetic.id.toString())
                    });
                    let item = this.getItem(index, cosmetics);
                    if(item) {
                        return item;
                    }
                })}
            </div>
        );
    }
}