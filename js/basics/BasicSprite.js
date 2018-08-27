import { h, render, Component } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class BasicSprite extends Base
{
    Update(deltaTime)
    {
        const { ticker } = this.props.root
        const { bunny } = this.objects
        bunny.rotation += 0.1 * deltaTime
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        return (
            <Container>
                <Sprite object='bunny' texture={PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/basics/bunny.png')}
                    position={[screen.width / 2, screen.height / 2]}
                    anchor={[0.5]}
                />
            </Container>
        )
    }
}
