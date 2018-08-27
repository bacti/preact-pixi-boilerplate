import { h } from 'preact'
import { Base, Container, AnimatedSprite } from 'preact-pixi'

export default class BasicSpriteSheet extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }

        PIXI.loader
        .add('https://pixijs.io/examples/required/assets/basics/fighter.json')
        .load( _ =>
        {
            let frames = [...Array(30)].map((_, index) => PIXI.Texture.fromFrame('rollSequence00' + ('0' + index).slice(-2) + '.png'))
            this.setState({ textures: frames })
        })
    }

    Update(deltaTime)
    {
        const { ship } = this.objects
        ship.rotation += 0.01
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        return (
            <Container>
                <AnimatedSprite object='ship' textures={this.state.textures} 
                    position={[screen.width/2, screen.height/2]}
                    anchor={[0.5]}
                    animationSpeed={0.5}
                    play
                />
            </Container>
        )
    }
}
