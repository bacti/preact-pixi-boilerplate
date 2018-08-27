import { h } from 'preact'
import { Base, Container, Sprite, Graphics, RenderTexture } from 'preact-pixi'

export default class DemoMaskRT extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        PIXI.loader
        .add('t1', 'https://pixijs.io/examples/required/assets/bkg-grass.jpg')
        .add('t2', 'https://pixijs.io/examples/required/assets/BGrotate.jpg')
        .load( _ => this.setState({ textures: true }))
    }

    OnPointerMove(event)
    {
        const { renderTextureSprite } = this.objects
        const { renderer } = this.props.root
        if (this.dragging)
        {
            this.brush.position.copy(event.data.global)
            renderer.render(this.brush, renderTextureSprite.rt , false, null, false)
        }
    }

    OnPointerDown(event)
    {
        this.dragging = true
        this.OnPointerMove(event)
    }

    OnPointerUp(event)
    {
        this.dragging = false
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        const { imageToReveal, renderTextureSprite } = this.objects
        imageToReveal.mask = renderTextureSprite
    }

    render()
    {
        const { screen } = this.props.root
        this.brush = new PIXI.Graphics()
        this.brush.beginFill(0xffffff)
        this.brush.drawCircle(0, 0, 50)
        this.brush.endFill()
        this.dragging = false

        return (
            <Container>
                <Container
                    onPointerDown={evt => this.OnPointerDown(evt)}
                    onPointerUp={evt => this.OnPointerUp(evt)}
                    onPointerMove={evt => this.OnPointerMove(evt)}
                >
                    <Sprite texture={PIXI.loader.resources['t1'].texture}
                        width={1} height={1}
                    />
                    <Sprite object='imageToReveal' texture={PIXI.loader.resources['t2'].texture}
                        width={1} height={1}
                    />
                    <RenderTexture object='renderTextureSprite' source={this.brush} base={[screen.width,screen.height]} autoUpdate={false} />
                </Container>
            </Container>
        )
    }
}
