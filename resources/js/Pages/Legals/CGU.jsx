import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function CGU(props) {

    return (
        <MainLayout showOverflow={true}>
            <Head title="CGU" />

            <section className="flex flex-col mx-8 lg:mx-48 lg:my-20 pb-20">
                <h2 className="text-[28px] lg:text-[48px] font-bold">Conditions Générales d'Utilisation</h2>
                <div className="flex flex-col gap-8 text-justify">

                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">1. Objet</span>
                        Les présentes Conditions Générales d'Utilisation (ci-après dénommées "CGU") ont pour objet de définir les modalités et conditions dans lesquelles les utilisateurs (ci-après dénommés "utilisateur") peuvent accéder et utiliser le site "Banquise de Weils" (ci-après dénommé "le Site") exploité par WeilsTTV (ci-après dénommé "l'Exploitant").
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">2. Acceptation des CGU</span>
                        L'accès et l'utilisation du Site impliquent l'acceptation sans réserve des présentes CGU par l'utilisateur. En accédant au Site, l'utilisateur reconnaît avoir pris connaissance des présentes CGU et accepter de s'y conformer.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">3. Accès au Site</span>
                        Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. L'accès à certaines fonctionnalités nécessite une connexion via un compte Twitch. Tous les coûts liés à l'accès au Site, que ce soient les frais matériels, logiciels ou d'accès à Internet, sont à la charge de l'utilisateur.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">4. Inscription et Connexion</span>
                        Pour accéder à certaines fonctionnalités du Site, l'utilisateur doit se connecter via son compte Twitch. En utilisant cette méthode de connexion, l'utilisateur autorise le Site à accéder à certaines informations de son compte Twitch conformément à la politique de confidentialité de Twitch. L'utilisateur s'engage à fournir des informations exactes et à jour et à respecter les conditions d'utilisation de Twitch.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">5. Utilisation des Fonctionnalités</span>
                        L'utilisateur peut jouer à des mini-jeux, participer à des classements et consulter les résultats des jeux d'émission sur Twitch. L'utilisateur s'engage à utiliser ces fonctionnalités de manière respectueuse et conforme aux présentes CGU. Toute utilisation abusive, frauduleuse ou contraire aux lois et réglementations en vigueur est interdite.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">6. Propriété intellectuelle</span>
                        Tous les contenus présents sur le Site, y compris, mais sans s'y limiter, les textes, images, graphismes, logos, icônes, sons, logiciels, sont la propriété exclusive de l'Exploitant ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'Exploitant.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">7. Limitation de responsabilité</span>
                        L'Exploitant ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au Site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité. L'Exploitant ne garantit pas la disponibilité ou l'accessibilité ininterrompue du Site.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">8. Données personnelles</span>
                        L'Exploitant s'engage à protéger les données personnelles des utilisateurs conformément à la législation en vigueur. Les données recueillies via le compte Twitch sont utilisées uniquement pour les besoins des services proposés sur le Site. Pour plus d'informations, l'utilisateur est invité à consulter la Politique de Confidentialité du Site.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">9. Modifications des CGU</span>
                        L'Exploitant se réserve le droit de modifier à tout moment les présentes CGU. Les nouvelles CGU seront portées à la connaissance des utilisateurs par leur publication en ligne. L'utilisateur est invité à consulter régulièrement les CGU pour prendre connaissance des éventuelles modifications.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">10. Droit applicable et juridiction compétente</span>
                        Les présentes CGU sont soumises au droit Français. Tout litige relatif à l'exécution ou à l'interprétation des présentes CGU sera de la compétence exclusive des tribunaux du ressort de Paris.
                    </div>
                    <div id="cookiefirst-policy-page"></div>
<div>Cette déclaration de cookie a été créée et mise à jour par <a href="https://cookiefirst.com/fr/consent-management-platform/">Consent Management - CookieFirst</a>.</div>
                </div>
            </section>
        </MainLayout>
    )

}
