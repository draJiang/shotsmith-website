import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import { galleryWorkflows } from '@/data/workflowGallery';
import { siteDetails } from '@/data/siteDetails';
import styles from './workflows.module.css';

const title = 'Workflow Gallery — Shotsmith';
const description = 'Explore screenshot workflows and preview the actions on the Shotsmith canvas.';

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/workflows' },
    openGraph: { title, description, url: new URL('/workflows', siteDetails.siteUrl).toString() },
    twitter: { title, description },
};

export default function WorkflowGalleryPage() {
    return <div className={styles.page}>
        <div className={styles.shell}>
            <div className={styles.intro}>
                <h1>Good ideas,<br /><em>already connected.</em></h1>
                <p>Go beyond the screenshot. Explore action chains for the things you do every day, then peek inside each canvas to see how it works.</p>
            </div>
            <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>THE COLLECTION</span><h2>Find your next shortcut.</h2></div></div>
            <div className={styles.grid}>{galleryWorkflows.map((workflow) => <Link className={styles.card} key={workflow.slug} href={`/workflows/${workflow.slug}`}>
                <div className={styles.cardArt}>{workflow.poster ? <Image src={workflow.poster} alt="" width={960} height={660} /> : <WorkflowCanvas workflow={workflow} compact />}</div>
                <div className={styles.cardBottom}><h3>{workflow.name}</h3><p>{workflow.tagline}</p></div>
            </Link>)}</div>
            <div className={styles.endNote}><span>YOUR CANVAS IS WAITING</span><p>Every workflow starts with a screenshot. Where it goes next is up to you.</p></div>
        </div>
    </div>;
}
