package com.pointers.jobApp.repo;

import com.pointers.jobApp.model.JobPost;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Repository
public class JobRepo {

    List<JobPost> jobs=new ArrayList<>(Arrays.asList(
            new JobPost(1,"Java Developer","Java Developer with 2 years of experience",2, Arrays.asList("Java","Spring Boot","Hibernate")),
            new JobPost(2,"Frontend Developer","Frontend Developer with 3 years of experience",3, Arrays.asList("HTML","CSS","JavaScript")),
            new JobPost(3,"Data Scientist","Data Scientist with 4 years of experience",4, Arrays.asList("Python","R","Machine Learning"))
    ));

    public List<JobPost>getAllJobs(){
        return jobs;
    }

    public void addJob(JobPost jobPost){
        jobs.add(jobPost);
    }

    public JobPost getJob(int postId){
        for(JobPost job:jobs){
            if(job.getPostId()==postId){
                return job;
            }
        }
        return  null;
    }

    public void updateJob(JobPost updatedJob) {
        jobs.stream()
                .filter(job -> job.getPostId() == updatedJob.getPostId())
                .findFirst()
                .ifPresent(job -> {
                    job.setPostProfile(updatedJob.getPostProfile());
                    job.setPostDesc(updatedJob.getPostDesc());
                    job.setReqExperience(updatedJob.getReqExperience());
                    job.setPostTechStack(updatedJob.getPostTechStack());
                });
    }

    public void deleteJob(int postId) {
        jobs.removeIf(job -> job.getPostId() == postId);
    }
}
