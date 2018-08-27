import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'
require('../../libs/pixi-extra-filters')

export default class FilterOutline extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('bunny', 'https://pixijs.io/examples/required/assets/bunny.png')
        .load( _ => this.setState({ textures: true }))
    }

    FilterOn(i)
    {
        this.objects['bunny'+i].filters = [this.outlineFilterRed]
    }
    
    FilterOff(i)
    {
        this.objects['bunny'+i].filters = [this.outlineFilterBlue]
    }

    componentReady()
    {
        return this.state.textures
    }

    render()
    {
        const { screen } = this.props.root
        this.outlineFilterBlue = new PIXI.filters.OutlineFilter(2, 0x99ff99)
        this.outlineFilterRed = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5)

        return (
            <Container>
                <Container position={[screen.width / 2, screen.height / 2]}>
                {
                    [...Array(20)].map((_,i) =>
                    {
                        return <Sprite object={'bunny'+i} texture={this.loader.resources['bunny'].texture}
                            position={[(Math.random() * 2 - 1) * 300 | 0, (Math.random() * 2 - 1) * 200 | 0]}
                            scale={[(Math.random() * 3 | 0 * 0.1) + 1, 1]}
                            filters={[this.outlineFilterBlue]}
                            onPointerOver={evt => this.FilterOn(i)}
                            onPointerOut={evt => this.FilterOff(i)}
                        />
                    })
                }
                </Container>
            </Container>
        )
    }
}
