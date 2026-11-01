import { LuCamera, LuClipboard, LuEyeOff, LuLanguages, LuMessageSquare, LuScan, LuScissors, LuSparkles, LuPencil } from 'react-icons/lu';
import type { GalleryAction, GalleryWorkflow } from '@/data/workflowGallery';
import styles from './WorkflowCanvas.module.css';

const icons = { camera: LuCamera, scan: LuScan, languages: LuLanguages, eye: LuEyeOff, scissors: LuScissors, sparkles: LuSparkles, clipboard: LuClipboard, editor: LuPencil, hud: LuMessageSquare };

function ActionNode({ action, index }: { action: GalleryAction; index: number }) {
    const Icon = icons[action.icon];
    return <div className={styles.node} style={{ animationDelay: `${index * 90}ms` }}>
        <div className={styles.nodeHeader}>
            <span className={`${styles.icon} ${styles[action.category]}`}><Icon size={15} /></span>
            <span className={styles.nodeTitle}>{action.title}</span>
            {index === 0 && <span className={styles.triggerTag}>Trigger</span>}
        </div>
        <div className={styles.ports}>
            {action.input && <div className={styles.port}><span className={`${styles.handle} ${styles[action.input.kind]}`} />{action.input.label}</div>}
            {action.output && <div className={`${styles.port} ${styles.out}`}>{action.output.label}<span className={`${styles.handle} ${styles[action.output.kind]}`} /></div>}
        </div>
    </div>;
}

export default function WorkflowCanvas({ workflow, compact = false }: { workflow: GalleryWorkflow; compact?: boolean }) {
    const isBranch = workflow.slug === 'copy-text';
    const mainActions = isBranch ? workflow.actions.slice(0, 3) : workflow.actions;
    return <div className={`${styles.canvas} ${compact ? styles.compact : ''}`} aria-label={`${workflow.name} action preview`}>
        <div className={styles.canvasBar}><span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} /><span className={styles.canvasTitle}>{workflow.name}</span></div>
        <div className={styles.viewport}>
            <div className={styles.flow}>
                {mainActions.map((action, index) => <div className={styles.flowItem} key={action.title}>
                    {index > 0 && <div className={`${styles.connector} ${styles[mainActions[index - 1].output?.kind ?? 'image']}`} aria-hidden="true"><span /></div>}
                    <ActionNode action={action} index={index} />
                </div>)}
                {isBranch && <div className={styles.branch}>
                    <div className={styles.branchLine} aria-hidden="true" />
                    <ActionNode action={workflow.actions[3]} index={3} />
                </div>}
            </div>
        </div>
    </div>;
}
