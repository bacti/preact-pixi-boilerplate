import { h } from 'preact'
import { Base, Container, TilingSprite } from 'preact-pixi'

export default class BasicTilingSprite extends Base
{
    Update(deltaTime)
    {
        this.count += 0.005
        const { tilingSprite } = this.objects
        tilingSprite.tileScale.set(2 + Math.sin(this.count), 2 + Math.cos(this.count))
        tilingSprite.tilePosition.x += 1
        tilingSprite.tilePosition.y += 1
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        this.count = 0
        return (
            <Container>
                <TilingSprite object='tilingSprite'
                    texture={PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/p2.jpeg')}
                    width={screen.width}
                    height={screen.height}
                />
            </Container>
        )
    }
}
