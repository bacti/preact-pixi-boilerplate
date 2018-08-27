import { h } from 'preact'
import { Base, Container, AnimatedSprite } from 'preact-pixi'

export default class DemoAnimatedSprite extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }

        PIXI.loader
        .add('https://pixijs.io/examples/required/assets/mc.json')
        .load( _ =>
        {
            let frames = [...Array(26)].map((_, index) => PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (index + 1) + '.png'))
            this.setState({ textures: frames })
        })
    }

    componentReady()
    {
        return this.state.textures
    }

    render()
    {
        const { screen } = this.props.root
        return (
            <Container>
            {
                [...Array(50)].map((_, i) =>
                {
                    return <AnimatedSprite textures={this.state.textures} 
                        position={[Math.random() * screen.width, Math.random() * screen.height]}
                        anchor={[0.5]}
                        rotation={Math.random() * Math.PI}
                        scale={[0.75 + Math.random() * 0.5]}
                        gotoAndPlay={Math.random() * 27}
                    />
                })
            }
            </Container>
        )
    }
}
