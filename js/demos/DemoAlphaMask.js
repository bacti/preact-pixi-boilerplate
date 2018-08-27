import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class DemoAlphaMask extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('bg', 'https://pixijs.io/examples/required/assets/bkg.jpg')
        .add('cells', 'https://pixijs.io/examples/required/assets/cells.png')
        .add('mask', 'https://pixijs.io/examples/required/assets/flowerTop.png')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { mask } = this.objects
        mask.x += (this.target.x - mask.x) * 0.1
        mask.y += (this.target.y - mask.y) * 0.1
        Math.abs(mask.x - this.target.x) < 1 && this.Reset()
    }

    Reset()
    {
        this.target.x = Math.floor(Math.random() * 550)
        this.target.y = Math.floor(Math.random() * 300)
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        const { mask, cells } = this.objects
        cells.mask = mask
        this.target = new PIXI.Point()
        this.Reset()
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root

        return (
            <Container>
                <Sprite texture={this.loader.resources['bg'].texture} />
                <Sprite object='mask' texture={this.loader.resources['mask'].texture} position={[310,190]} anchor={[0.5]} />
                <Sprite object='cells' texture={this.loader.resources['cells'].texture} scale={[1.5]} />
            </Container>
        )
    }
}
