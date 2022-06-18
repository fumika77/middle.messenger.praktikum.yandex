import Block from '../../core/Block';
import { withRouter, withStore } from '../../utils';
import { BrowserRouter } from '../../core/Route';
import { Store } from '../../core/Store';
import { updateProfileAvatar } from '../../services/ProfileService';

type ProfileImagePageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
};

export class ProfileImage extends Block {
    constructor(props: ProfileImagePageProps) {
        super(props);
        this.setProps({
            filename: () => this.props.store.getState().profileImageFormData.file?.name,
            status: () => this.props.store.getState().profileImageFormData.status,
            onBackArrowClick: () => this.props.router.go('/profile-settings'),
        });
    }

    protected getStateFromProps() {
        this.state = {
            onChange: () => {
                const file = document.getElementById('inputFile')!.files![0];
                this.props.store.dispatch({ profileImageFormData: { file } });
            },
            onClick: () => {
                const { file } = this.props.store.getState().profileImageFormData;
                file && this.props.store.dispatch(updateProfileAvatar, file);
            },
        };
    }

    render() {
        // language=hbs
        return `
            <main> 
            <div class="profile__image__box">
                {{{BackArrow onClick=onBackArrowClick}}}
                {{{InputFile onChange=onChange filename=filename}}}
                {{#if status}}{{{ImageButton link="/profile-settings" onClick=onBackArrowClick
                                 style="done" src="img/like-1(32x32)@1x.png"}}}
                    {{else}}{{{Button text="Сохранить" onClick=onClick}}}
                {{/if}}
            </div>
            </main>
        `;
    }
}

export default withRouter(withStore(ProfileImage));
