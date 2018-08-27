import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'

export default class DemoCacheAsBitmap extends Base
{
    constructor()
    {
        super()
        this.state = { spritesheet: null }
        PIXI.loader
        .add('spritesheet', 'https://pixijs.io/examples/required/assets/monsters.json')
        .load(evt => this.setState({ spritesheet: true }))
    }

    Update(deltaTime)
    {
        const { alienContainer } = this.objects
        ;[...Array(this.totalaliens)].map((_, i) =>
        {
            let alien = this.objects['dude' + i]
            alien.rotation += 0.1
        })
        this.count += 0.01
        alienContainer.scale.set(Math.sin(this.count))
        alienContainer.rotation += 0.01
    }

    OnClick()
    {
        const { alienContainer } = this.objects
        alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap
    }

    componentReady()
    {
        return this.state.spritesheet
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        let alienFrames =
        [
            'eggHead.png',
            'flowerTop.png',
            'helmlok.png',
            'skully.png',
        ]
        this.totalaliens = 100
        this.count = 0

        return (
            <Container>
                <Container object='alienContainer' position={[400,300]} onClick={evt => this.OnClick(evt)}>
                {
                    [...Array(this.totalaliens)].map((_, i) =>
                    {
                        return <Sprite object={'dude'+i} frame={alienFrames[i % 4]}
                            position={[Math.random() * 800 - 400, Math.random() * 600 - 300]}
                            anchor={[0.5]}
                            tint={Math.random() * 0xFFFFFF}
                        />
                    })
                }
                </Container>
            </Container>
        )
    }
}
