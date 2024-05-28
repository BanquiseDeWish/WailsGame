import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function CGV(props) {

    return (
        <MainLayout showOverflow={true}>
            <Head title="CGV" />

            <section className="flex flex-col mx-8 lg:mx-48 lg:my-20 pb-20">
                <h2 className="text-[28px] lg:text-[48px] font-bold">Conditions Générales de Vente</h2>
                <div className="flex flex-col gap-8 text-justify">
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">1. Objet</span>
                        <span>Les présentes Conditions Générales de Vente (ci-après dénommées "CGV") ont pour objet de définir les modalités et conditions de vente des cosmétiques numériques (ci-après dénommés "Produits") destinés à des personnages virtuels, proposés par WeilsTTV (ci-après dénommée "le Vendeur") sur le site <b>Banquise de Weils</b> (ci-après dénommé "le Site").</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">2. Acceptation des CGV</span>
                        Toute commande de Produits implique l'acceptation sans réserve des présentes CGV par l'acheteur (ci-après dénommé "l'Acheteur"). En passant commande, l'Acheteur reconnaît avoir pris connaissance des présentes CGV et accepter de s'y conformer.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">3. Produits</span>
                        Les Produits proposés à la vente sont des cosmétiques numériques destinés à des personnages virtuels. Les caractéristiques essentielles des Produits sont décrites sur le Site. Les photographies et illustrations des Produits n'ont pas de valeur contractuelle.
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[24px] font-bold">4. Commande</span>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <span className="text-[16px] font-semibold">4.1 Processus de commande</span>
                                Pour passer commande, l'Acheteur doit suivre le processus indiqué sur le Site, qui comprend la sélection des Produits, la validation du panier et le paiement.
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[16px] font-semibold">4.2 Confirmation de commande</span>
                                Une fois la commande passée, le Vendeur envoie une confirmation de commande à l'Acheteur par e-mail. La vente est réputée conclue à la date d'envoi de cette confirmation.

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">5. Prix et Paiement</span>
                        5.1 Prix
                        Les prix des Produits sont indiqués sur le Site en monnaie locale et incluent toutes les taxes applicables. Le Vendeur se réserve le droit de modifier les prix à tout moment, mais les Produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.

                        5.2 Paiement
                        Le paiement s'effectue en ligne par les moyens de paiement indiqués sur le Site. Le Vendeur utilise des systèmes sécurisés de paiement en ligne. La commande ne sera validée qu'après réception et validation du paiement.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">6. Livraison</span>
                        Les Produits sont délivrés immédiatement après la validation du paiement sous forme de contenus numériques téléchargeables ou activables dans l'espace de jeu virtuel de l'Acheteur. Aucune livraison physique n'est requise pour les Produits numériques.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">7. Capacité juridique, âge</span>
                        <span>Pour commander sur le site <b>Banquise de Weils</b>, vous attestez de manière ferme et sous votre propre et unique responsabilité que :</span>
                        <ul className="pl-8">
                            <li className="list-disc">Vous avez pleine capacité de jouissance et d’exercice pour contracter avec nous.</li>
                            <li className="list-disc">Vous déclarez être âgé d’au moins 18 ans et avoir la capacité juridique de conclure le présent contrat.</li>
                        </ul>
                        <br />
                        Il ne peut pas nous être exigé de vérifier l’âge des acheteurs du site. <br />
                        Si l’acheteur est une personne physique mineure, il se doit d'obtenir le consentement de ses parents/tuteurs avant de passer commande. L'autorité parentale reconnaît quant à elle avoir accepté les conditions générales et se porte garante du Joueur mineur. Toute utilisation du site Paladium et de ses services par le Joueur mineur est réalisée sous l'entière responsabilité des titulaires de l'autorité parentale.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">8. Droit de rétractation</span>
                        Conformément à la législation en vigueur, l'Acheteur ne bénéficie d'aucun droit de rétractation pour les contenus numériques immédiatement délivrés et accessibles après l'achat, l'Acheteur acceptant expressément de renoncer à son droit de rétractation en validant sa commande.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">9. Garantie et Responsabilité</span>
                        9.1 Garantie
                        Les Produits numériques bénéficient de la garantie légale de conformité. En cas de défaut de conformité, le Vendeur s'engage à remplacer ou à réparer les Produits défectueux.

                        9.2 Responsabilité
                        Le Vendeur ne saurait être tenu responsable de tout dommage résultant d'une mauvaise utilisation des Produits par l'Acheteur ou d'une incompatibilité avec le matériel ou le logiciel utilisé par l'Acheteur.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">10. Données personnelles</span>
                        Les données personnelles collectées lors de la commande sont traitées conformément à la politique de confidentialité du Site. L'Acheteur dispose des droits d'accès, de rectification et de suppression de ses données personnelles conformément à la législation en vigueur.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">11. Modifications des CGV</span>
                        Le Vendeur se réserve le droit de modifier à tout moment les présentes CGV. Les nouvelles CGV seront applicables à toute commande passée après leur mise en ligne sur le Site.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[24px] font-bold">12. Droit applicable et juridiction compétente</span>
                        Les présentes CGV sont soumises au droit Français. Tout litige relatif à l'exécution ou à l'interprétation des présentes CGV sera de la compétence exclusive des tribunaux du ressort de Paris.
                    </div>
                </div>
            </section>
        </MainLayout>
    )

}
