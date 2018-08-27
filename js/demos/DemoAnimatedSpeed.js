import { h } from 'preact'
import { Base, Container, AnimatedSprite } from 'preact-pixi'

export default class DemoAnimatedSpeed extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }

        PIXI.loader
        .add('spritesheet', 'https://pixijs.io/examples/required/assets/0123456789.json')
        .load((loader, resources) =>
        {
            let frames = [...Array(10)].map((_, index) =>
            {
                let framekey = '0123456789 ' + index + '.ase'
                let texture = PIXI.Texture.fromFrame(framekey)
                let time = resources.spritesheet.data.frames[framekey].duration
                return { texture, time }
            })
            this.setState({ textures: frames })
        })
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        const { slow, fast } = this.objects
        slow.x -= slow.width / 2
        fast.x += fast.width / 2
    }

    render()
    {
        const { screen } = this.props.root
        let scaling = 4
        return (
            <Container>
                <AnimatedSprite object='slow' textures={this.state.textures} 
                    position={[screen.width / 2, screen.height / 2]}
                    anchor={[0.5]}
                    scale={[scaling]}
                    animationSpeed={0.5}
                    play
                />
                <AnimatedSprite object='fast' textures={this.state.textures} 
                    position={[screen.width / 2, screen.height / 2]}
                    anchor={[0.5]}
                    scale={[scaling]}
                    play
                />
            </Container>
        )
    }
}
