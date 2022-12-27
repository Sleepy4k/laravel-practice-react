import { Link } from "@inertiajs/inertia-react";

const Paginator = ({ meta }) => {
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div className="btn-group">
            {prev && <Link className="btn btn-outline" href={prev}>«</Link>}
            <Link className="btn btn-outline">{current}</Link>
            {next && <Link className="btn btn-outline" href={next}>»</Link>}
        </div>
    )
}

export default Paginator