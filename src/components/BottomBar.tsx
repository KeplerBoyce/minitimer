export default function BottomBar(props: {className?: string}) {
    const { className } = props;

    return (
        <div className={"p-4 " + className} >
            Bottom bar content
        </div>
    )
}
