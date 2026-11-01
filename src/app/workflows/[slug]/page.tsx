import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuArrowLeft, LuArrowRight, LuCheck, LuInfo } from 'react-icons/lu';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import { findGalleryWorkflow, galleryWorkflows } from '@/data/workflowGallery';
import { siteDetails } from '@/data/siteDetails';
import styles from '../workflows.module.css';

export function generateStaticParams() { return galleryWorkflows.map(({ slug }) => ({ slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const workflow = findGalleryWorkflow(params.slug);
    if (!workflow) return { title: 'Workflow not found — Shotsmith' };

    const title = `${workflow.name} Workflow — Shotsmith`;
    const url = new URL(`/workflows/${workflow.slug}`, siteDetails.siteUrl).toString();
    const image = workflow.poster ? { url: workflow.poster, width: 960, height: 660, alt: `${workflow.name} workflow preview` } : undefined;

    return {
        title,
        description: workflow.description,
        alternates: { canonical: url },
        openGraph: { title, description: workflow.description, url, images: image ? [image] : undefined },
        twitter: { title, description: workflow.description, images: image ? [image.url] : undefined },
    };
}

export default function WorkflowDetailPage({ params }: { params: { slug: string } }) {
    const workflow = findGalleryWorkflow(params.slug);
    if (!workflow) notFound();
    const next = galleryWorkflows[(galleryWorkflows.indexOf(workflow) + 1) % galleryWorkflows.length];
    return <div className={styles.page}>
        <div className={styles.shell}>
            <div className={styles.breadcrumb}><Link href="/workflows"><LuArrowLeft size={16} /> All workflows</Link><span>/</span><span>{workflow.name}</span></div>
            <div className={styles.detailIntro}><div><h1>{workflow.name}<span className={styles.period}>.</span></h1><p className={styles.tagline}>{workflow.tagline}</p></div></div>
            <div className={styles.detailCanvas}><WorkflowCanvas workflow={workflow} /></div>
            <div className={styles.detailBody}><div className={styles.overview}><span className={styles.eyebrow}>THE IDEA</span><h2>From capture<br />to complete.</h2><p>{workflow.description}</p>{workflow.note && <div className={styles.note}><LuInfo size={18} /><span>{workflow.note}</span></div>}</div>
                <div className={styles.steps}><span className={styles.eyebrow}>INSIDE THE WORKFLOW</span>{workflow.actions.map((action, i) => <div className={styles.step} key={`${i}-${action.title}`}><span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span><div><h3>{action.title}</h3><p>{action.detail}</p></div><LuCheck className={styles.stepCheck} size={18} /></div>)}</div>
            </div>
            <Link className={styles.next} href={`/workflows/${next.slug}`}><span><small>UP NEXT / {next.category.toUpperCase()}</small><strong>{next.name}</strong></span><LuArrowRight size={26} /></Link>
        </div>
    </div>;
}
