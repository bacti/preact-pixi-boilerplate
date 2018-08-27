import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class DemoDragging extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        PIXI.loader
        .add('bunny', 'https://pixijs.io/examples/required/assets/bunny.png')
        .load( _ => this.setState({ textures: true }))
    }

    OnDragStart(event)
    {
        this.data = event.data
        this.alpha = 0.5
        this.dragging = true
    }
    
    OnDragEnd()
    {
        this.alpha = 1
        this.dragging = false
        this.data = null
    }
    
    OnDragMove()
    {
        if (this.dragging)
        {
            var newPosition = this.data.getLocalPosition(this.parent)
            this.x = newPosition.x
            this.y = newPosition.y
        }
    }

    componentReady()
    {
        return this.state.textures
    }

    render()
    {
        const { screen } = this.props.root
        let bunny = PIXI.loader.resources['bunny'].texture
        bunny.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        return (
            <Container>
            {
                [...Array(10)].map((_, i) =>
                {
                    return <Sprite texture={bunny}
                        position={[Math.random() * screen.width, Math.random() * screen.height]}
                        anchor={[0.5]}
                        scale={[3]}
                        onPointerDown={this.OnDragStart}
                        onPointerUp={this.OnDragEnd}
                        onPointerUpOutside={this.OnDragEnd}
                        onPointerMove={this.OnDragMove}
                    />      
                })
            }
            </Container>
        )
    }
}
