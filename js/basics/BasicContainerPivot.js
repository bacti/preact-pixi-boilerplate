import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class BasicContainerPivot extends Base
{
    Update(deltaTime)
    {
        const { ticker } = this.props.root
        const { container } = this.objects
        container.rotation -= 0.01 * deltaTime
    }

    componentDidMount()
    {
        const { container } = this.objects
        container.pivot.x = container.width / 2
        container.pivot.y = container.height / 2
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        let texture = PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/basics/bunny.png')
        return (
            <Container>
                <Container object='container' position={[screen.width/2,screen.height/2]}>
                {
                    [...Array(25)].map((_, i) =>
                    {
                        return <Sprite texture={texture}
                            position={[(i % 5) * 40, Math.floor(i / 5) * 40]}
                            anchor={[0.5]}
                        />
                    })
                }
                </Container>
            </Container>
        )
    }
}
