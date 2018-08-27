import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class DemoTextureSwap extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('texture', 'https://pixijs.io/examples/required/assets/flowerTop.png')
        .add('secondTexture', 'https://pixijs.io/examples/required/assets/eggHead.png')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { dude } = this.objects
        dude.rotation += 0.1
    }

    OnClick()
    {
        const { dude } = this.objects
        this.bol = !this.bol
        dude.texture = this.loader.resources[this.bol ? 'secondTexture' : 'texture'].texture 
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
        this.bol = false

        return (
            <Container>
                <Sprite object='dude' onClick={evt => this.OnClick(evt)} texture={this.loader.resources['texture'].texture}
                    position={[screen.width/2, screen.height/2]}
                    anchor={[0.5]}
                />
            </Container>
        )
    }
}
