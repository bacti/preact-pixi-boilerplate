import { h } from 'preact'
import { Base, Container, Graphics, Rope } from 'preact-pixi'

export default class DemoStrip extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('snake', 'https://pixijs.io/examples/required/assets/snake.png')
        .load(evt => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        this.count += 0.1
        this.points.forEach((point, i) =>
        {
            point.y = Math.sin((i * 0.5) + this.count) * 30
            point.x = i * this.ropeLength + Math.cos((i * 0.3) + this.count) * 20
        })
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
        this.ropeLength = 918 / 20
        this.points = [...Array(20)].map((_, i) => new PIXI.Point(i * this.ropeLength, 0))
        this.count = 0
        
        return (
            <Container>
                <Container position={[400,300]} scale={[800/1100]}>
                    <Rope position={[-459,0]} texture={this.loader.resources['snake'].texture} points={this.points} />
                </Container>
            </Container>
        )
    }
}
