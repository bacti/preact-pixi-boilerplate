import { h } from 'preact'
import { Base, Container, Sprite, Graphics } from 'preact-pixi'

export default class BasicVideo extends Base
{
    OnPlayVideo()
    {
        const { button, video } = this.objects
        button.destroy()
        video.texture = PIXI.Texture.fromVideo('https://pixijs.io/examples/required/assets/testVideo.mp4')
    }

    render()
    {
        const { screen } = this.props.root
        return (
            <Container>
                <Sprite object='video' width={1} height={1} />
                <Graphics object='button' position={[screen.width / 2 - 50, screen.height / 2 - 50]} onClick={ _ => this.OnPlayVideo()}>
                    <Graphics.RoundedRect endFill color={[0x0, 0.5]} x={0} y={0} width={100} height={100} radius={10} />
                    <Graphics.Point color={[0xffffff]} x={36} y={30} />
                    <Graphics.Line x={36} y={70} />
                    <Graphics.Line x={70} y={50} />
                </Graphics>
            </Container>
        )
    }
}
