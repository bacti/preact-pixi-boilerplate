import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'
require('../../libs/pixi-extra-filters')

export default class FilterDisplacementMap extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('bg', 'https://pixijs.io/examples/required/assets/bkg-grass.jpg')
        .add('maggot', 'https://pixijs.io/examples/required/assets/maggot.png')
        .add('displace', 'https://pixijs.io/examples/required/assets/displace.png')
        .add('ring', 'https://pixijs.io/examples/required/assets/ring.png')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        this.count += 0.05
        ;[...Array(this.maggotNum)].map((_,i) =>
        {
            let maggot = this.objects['maggot'+i]
            maggot.props.direction += maggot.props.turnSpeed * 0.01
            maggot.x += Math.sin(maggot.props.direction) * maggot.props.speed
            maggot.y += Math.cos(maggot.props.direction) * maggot.props.speed
    
            maggot.rotation = -maggot.props.direction - Math.PI / 2
            maggot.scale.x = maggot.props.original.x + Math.sin(this.count) * 0.2
    
            if (maggot.x < this.bounds.x)
            {
                maggot.x += this.bounds.width
            }
            else
            if (maggot.x > this.bounds.x + this.bounds.width)
            {
                maggot.x -= this.bounds.width
            }
    
            if (maggot.y < this.bounds.y)
            {
                maggot.y += this.bounds.height
            }
            else
            if (maggot.y > this.bounds.y + this.bounds.height)
            {
                maggot.y -= this.bounds.height
            }
        })
    }

    OnPointerMove(evt)
    {
        const { displace, ring } = this.objects
        ring.visible = true
        displace.position.set(evt.data.global.x - 25, evt.data.global.y)
        ring.position.copy(displace.position)
    }
    
    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        const { container, displace } = this.objects
        let displacementFilter = new PIXI.filters.DisplacementFilter(displace)
        displacementFilter.scale.x = 110
        displacementFilter.scale.y = 110
        container.filters = [displacementFilter]
        ;[...Array(this.maggotNum)].map((_,i) =>
        {
            let maggot = this.objects['maggot'+i]
            maggot.props.original.copy(maggot.scale)
        })
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        let padding = 100
        this.bounds = new PIXI.Rectangle(-padding, -padding, screen.width + padding * 2, screen.height + padding * 2)
        this.maggotNum = 20
        this.count = 0

        return (
            <Container>
                <Container object='container' onPointerMove={evt => this.OnPointerMove(evt)}>
                    {
                        [...Array(this.maggotNum)].map((_,i) =>
                        {
                            return <Sprite object={'maggot'+i} texture={this.loader.resources['maggot'].texture}
                                position={[Math.random() * this.bounds.width, Math.random() * this.bounds.height]}
                                scale={[1 + Math.random() * 0.3]}
                                anchor={[0.5]}
                                direction={Math.random() * Math.PI * 2}
                                speed={1}
                                turnSpeed={Math.random() - 0.8}
                                original={new PIXI.Point()}
                            />
                        })
                    }
                    <Sprite texture={this.loader.resources['bg'].texture} width={1} height={1} alpha={0.4} />
                </Container>
                <Sprite object='displace' texture={this.loader.resources['displace'].texture} anchor={[0.5]} />
                <Sprite object='ring' texture={this.loader.resources['ring'].texture} anchor={[0.5]} visible={false} />
            </Container>
        )
    }
}
