import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function MentionsLegals(props) {

    return (
        <MainLayout showOverflow={true}>
            <Head title="Mentions Légales" />

            <section className="flex flex-col mx-8 lg:mx-48 lg:my-20 pb-20">
                <h2 className="text-[28px] lg:text-[48px] font-bold">Conditions Générales d'Utilisation</h2>
                <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la
                Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et
                visiteurs, ci-après "l'utilisateur", du site <a href="https://banquisedeweils.fr">https://banquisedeweils.fr</a> , ci-après le "Site", les présentes
                mentions légales.</p>
                <br />
                La connexion et la navigation sur le Site par l’utilisateur implique acceptation intégrale et sans
                réserve des présentes mentions légales.
                <br />
                Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».
                <br /><br />
                <span className="text-[24px] font-bold">ARTICLE 1 - L'EDITEUR</span>
                L’édition et la direction de la publication du Site est assurée par Florent Calabrési, et l'adresse e-mail
                florent.cala@gmail.com.
                <br />ci-après l'"Editeur".
                <br /><br />
                <span className="text-[24px] font-bold">ARTICLE 2 - L'HEBERGEUR</span>
                L'hébergeur du Site est la société PulseHeberg, dont le siège social est situé au 9, Boulevard de
                Strasbourg 83000 Toulon , avec le numéro de téléphone : 330422141360 + adresse mail de
                contact
                <br /><br />
                <span className="text-[24px] font-bold">ARTICLE 3 - ACCES AU SITE</span>
                Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption
                programmée ou non et pouvant découlant d’une nécessité de maintenance.
                En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu responsable.
                <br /><br />
                <span className="text-[24px] font-bold">ARTICLE 4 - COLLECTE DES DONNEES</span>
                Le Site assure à l'utilisateur une collecte et un traitement d'informations personnelles dans le respect
                de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers
                et aux libertés.
                <br /><br />
                En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'utilisateur dispose d'un droit
                d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'utilisateur
                exerce ce droit :
                <br /><br />
                · via son espace personnel;
                <br /><br />
                Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site,
                sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires
                telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.
                <br /><br />
                <div className="flex gap-2">
                    <span>Pour plus d’informations, se reporter aux CGU du site</span> <Link href="https://banquisedeweils.fr/legals/cgu"> https://banquisedeweils.fr/legals/cgu</Link>
                    <span>accessible à la rubrique "CGU"</span>
                </div>
                <br />
                <div className="flex gap-2">
                    <span>Pour plus d’informations, se reporter aux CGU du site</span> <Link href="https://banquisedeweils.fr/legals/cgv"> https://banquisedeweils.fr/legals/cgv</Link>
                    <span>accessible à la rubrique "CGV"</span>
                </div>


            </section>
        </MainLayout>
    )

}
