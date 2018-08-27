import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class DemoStarWarp extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('star', 'https://pixijs.io/examples/required/assets/star.png')
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { screen } = this.props.root
        this.speed += (this.warpSpeed - this.speed) / 20
        this.cameraZ += deltaTime * 10 * (this.speed + this.baseSpeed)
        ;[...Array(this.starAmount)].map((_,i) =>
        {
            let star = this.objects['star' + i]
            let { props } = star
            props.z < this.cameraZ && this.RandomizeStar(star)
            
            let z = props.z - this.cameraZ
            star.x = props.x * (this.fov / z) * screen.width + screen.width / 2
            star.y = props.y * (this.fov / z) * screen.width + screen.height / 2
            
            let dxCenter = star.x - screen.width / 2
            let dyCenter = star.y - screen.height / 2
            let distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter)
            let distanceScale = Math.max(0, (2000 - z) / 2000)
            star.scale.x = distanceScale * this.starBaseSize
            star.scale.y = distanceScale * this.starBaseSize + distanceScale * this.speed * this.starStretch * distanceCenter / screen.width
            star.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
        })
    }

    RandomizeStar(star, initial)
    {
        let { props } = star
        let deg = Math.random() * Math.PI * 2
        let distance = Math.random() * 50 + 1
        props.x = Math.cos(deg) * distance
        props.y = Math.sin(deg) * distance
        props.z = initial ? Math.random() * 2000 : this.cameraZ + Math.random() * 1000 + 2000
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        [...Array(this.starAmount)].map((_,i) => this.RandomizeStar(this.objects['star' + i], true))
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        this.starAmount = 1000
        this.cameraZ = 0
        this.fov = 20
        this.baseSpeed = 0.025
        this.speed = 0
        this.warpSpeed = 0
        this.starStretch = 5
        this.starBaseSize = 0.05
        setInterval(evt => { this.warpSpeed = this.warpSpeed > 0 ? 0 : 1 }, 5000)

        return (
            <Container>
            {
                [...Array(this.starAmount)].map((_,i) =>
                {
                    return <Sprite object={'star'+i} texture={this.loader.resources['star'].texture} anchor={[0.5, 0.7]} x={0} y={0} z={0} />
                })
            }
            </Container>
        )
    }
}
