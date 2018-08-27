import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class BasicClick extends Base
{
    OnClick()
    {
        const { bunny } = this.objects
        bunny.scale.x *= 1.25
        bunny.scale.y *= 1.25
    }

    render()
    {
        const { screen } = this.props.root
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST // will retain pixelation
        return (
            <Container>
                <Sprite object='bunny' texture={PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/basics/bunny.png')}
                    position={[screen.width / 2, screen.height / 2]}
                    anchor={[0.5]}
                    onClick={ _ => this.OnClick()}
                />
            </Container>
        )
    }
}
