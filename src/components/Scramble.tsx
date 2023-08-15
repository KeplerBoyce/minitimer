export default function Scramble(props: {scramble: string, className?: string}) {
    const { scramble, className } = props;

    return (
        <div className={"text-center p-4 " + className} >
            {scramble}
        </div>
    )
}
